+++
draft = false
date = 2024-06-13T12:40:48+03:00
title = "Mature REPL for RayforceDB"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++

Just to warm up the current blog, I've decided to tell a little bit about the REPL implementation for RayforceDB. It's worth saying that using an old simple REPL with rlwrap is enough for most cases, but every mature project must have command history, coloring, and autocompletion. In this part, I'll talk about POSIX-compatible terminals. We'll address Windows support later. The main point was to avoid using any external libraries, so we'll use only POSIX functions.

First of all, we need to turn the current terminal into raw mode and revert it back on exit. The starting point is to define a structure for the terminal state:

```c
#define TERM_BUF_SIZE 1024

typedef struct history_t
{
    i64_t fd;
    str_p lines;
    u64_t size;
    u64_t pos;
    u64_t index;
    i64_t search_dir;
    i64_t curr_saved;
    u64_t curr_len;
    c8_t curr[TERM_BUF_SIZE];
} *history_p;

typedef struct term_t
{
    struct termios oldattr;
    struct termios newattr;
    i32_t buf_len;
    i32_t buf_pos;
    c8_t buf[TERM_BUF_SIZE];
    u64_t fnidx;
    u64_t varidx;
    u64_t colidx;
    history_p history;
} *term_p;
```

At first glance, this seems enough for our tasks, so let's start. The basic things we have to do are: initialize the terminal, turn it into raw mode, and revert it back on exit. The initialization is simple:

```c
...
    tcgetattr(STDIN_FILENO, &term->oldattr);
    term->newattr = term->oldattr;
    term->newattr.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &term->newattr);
    ...
```

Now we will receive events on every key press, instead of waiting for the newline. The next step is to read the key press events and handle them. Moving the cursor, deleting characters, and so on is done through escape sequences. We need to read and handle them. The simplest way to do this is to read the first byte, check if it is an escape sequence, and if it is, read the next bytes and handle them. Something like this:

```c
...
case '\033': // Escape sequence
            term_reset_idx(term);
            if (read(STDIN_FILENO, &c, 1) == 1 && c == '[')
            {
                if (read(STDIN_FILENO, &c, 1) == 1)
                {
                    switch (c)
                    {
                    case 'A': // Up arrow
                        history_save_current(term->history, term->buf, term->buf_len);
                        l = history_prev(term->history, term->buf);
                        ...
```

To send commands to the terminal, we need to use escape sequences as well. Here are example functions for moving the cursor and clearing the screen:

```c
nil_t cursor_move_left(i32_t i)
{
    printf("\033[%dD", i);
}

nil_t cursor_move_right(i32_t i)
{
    printf("\033[%dC", i);
}

nil_t line_clear()
{
    printf("\r\033[K");
}
```

This terminal will behave like a tiny pre-parser, aware of basic coloring idioms but unaware of the language syntax. To let the terminal check for 'special' words, we will expose env functions from the Rayforce core and let the terminal use them. The next step is to implement autocompletion and history search. Autocompletion is simple: we check the current word and find matching words in the environment. The history search is a bit more complicated but still straightforward. We need to save the current line, then search for the next or previous line that matches the current line. We need to add some functions:

```c
nil_t history_add(history_p history, c8_t buf[], u64_t len);
i64_t history_prev(history_p history, c8_t buf[]);
i64_t history_next(history_p history, c8_t buf[]);
i64_t history_save_current(history_p history, c8_t buf[], u64_t len);
i64_t history_restore_current(history_p history, c8_t buf[]);
nil_t history_reset_current(history_p history);
```

History is just an mmaped file, so it will be saved on exit and restored on start. Autocompletion involves finding the current word and matching it with words in the environment. Later, I got the idea to search through the user environment and inside table columns as well as through internal verbs. This should help write requests faster. Autocompletion is done by searching for matching words in the environment and then replacing the current word with the matching word in the current buffer. I'm also considering adding reverse completion if needed.

The last thing we need to do is to return the terminal to normal mode on exit.

```c
nil_t term_destroy(term_p term)
{
...
    tcsetattr(STDIN_FILENO, TCSANOW, &term->oldattr);
...
}
```

The (almost) final result:

{{< asciinema src="/asciinema/repl.cast" >}}

Afterall, it increased entire binary size of RayforceDB by 10kb. But it's worth it. The terminal is now mature and can be used in production. The next step is to implement Windows support. I'll talk about it in the next part. Stay tuned!
