
install-js-deps:
	bower install
	git submodule init
	git submodule update

watch:
	compass watch

.PHONY: watch
