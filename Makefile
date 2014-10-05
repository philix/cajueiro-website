
install-js-deps:
	bower install
	git submodule init
	git submodule update

watch:
	compass watch

build:
	node js/jsx-requirejs-plugin/r.js -o build.js

.PHONY: install-js-deps watch build
