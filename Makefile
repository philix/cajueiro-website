
install-js-deps:
	bower install
	git submodule init
	git submodule update

watch:
	compass watch

build:
	compass compile
	node js/jsx-requirejs-plugin/r.js -o build.js

deploy: build
	rsync -av ~/code/balneario/ felipe@balneariocajueiro.com.br:/home/felipe/balneario

.PHONY: install-js-deps watch build deploy
