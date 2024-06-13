run:
	hugo server -D

clean:
	rm -rf public
	rm -rf resources
	hugo --gc
	rm -f .hugo_build.lock