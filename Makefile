
install-js-deps:
	bower install
	git submodule init
	git submodule update

watch:
	compass watch

build:
	node r.js -o build.js

.PHONY: watch
