# MiniKit Build System

.PHONY: dist css js clean size watch pack publish

NAME = minikit
DIST = dist

CSS_SRC = src/css/index.css
JS_SRC  = src/js/index.js

dist: css js size

css:
	@mkdir -p $(DIST)

	@npx esbuild $(CSS_SRC) \
		--bundle \
		--outfile=$(DIST)/$(NAME).css

	@npx esbuild $(CSS_SRC) \
		--bundle \
		--minify \
		--outfile=$(DIST)/$(NAME).min.css

	@gzip -9 -k -f $(DIST)/$(NAME).min.css

	@echo "CSS: $$(wc -c < $(DIST)/$(NAME).min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p $(DIST)

	@npx esbuild $(JS_SRC) \
		--bundle \
		--format=esm \
		--outfile=$(DIST)/$(NAME).js

	@npx esbuild $(JS_SRC) \
		--bundle \
		--format=esm \
		--minify \
		--outfile=$(DIST)/$(NAME).min.js

	@gzip -9 -k -f $(DIST)/$(NAME).min.js

	@echo "JS: $$(wc -c < $(DIST)/$(NAME).min.js | tr -d ' ') bytes (minified)"

watch:
	@npx esbuild $(CSS_SRC) \
		--bundle \
		--watch \
		--outfile=$(DIST)/$(NAME).css

clean:
	@rm -rf $(DIST)

size:
	@echo ""
	@echo "Bundle:"
	@echo ""
	@echo "CSS (src):   $$(wc -c < $(DIST)/$(NAME).css | tr -d ' ') bytes"
	@echo "CSS (min):   $$(wc -c < $(DIST)/$(NAME).min.css | tr -d ' ') bytes"
	@echo "CSS (gzip):  $$(wc -c < $(DIST)/$(NAME).min.css.gz | tr -d ' ') bytes"
	@echo ""
	@echo "JS (src):    $$(wc -c < $(DIST)/$(NAME).js | tr -d ' ') bytes"
	@echo "JS (min):    $$(wc -c < $(DIST)/$(NAME).min.js | tr -d ' ') bytes"
	@echo "JS (gzip):   $$(wc -c < $(DIST)/$(NAME).min.js.gz | tr -d ' ') bytes"

pack: clean dist
	@npm pack --dry-run

publish: clean dist
	@npm publish --access public
