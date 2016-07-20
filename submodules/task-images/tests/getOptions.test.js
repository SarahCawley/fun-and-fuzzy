var test = require('tape');
var getOptions = require('../lib/getOptions');

test('getOptions() :: no options throws error', function(t) {
	  t.plan(1);
	  try {
	    getOptions();
	  } catch(e) {
	    t.equal(true, true);
	  }
});

test('getOptions({ src }) :: no dest throws error', function(t) {
  t.plan(1);
  try {
    getOptions({
      src: 'source',
			meta: 'meta.yaml'
    });
  } catch(e) {
    t.equal(true, true);
  }
});

test('getOptions({ dest }) :: no src throws error', function(t) {
  t.plan(1);
  try {
    getOptions({
      dest: 'dist',
			meta: 'meta.yaml'
    });
  } catch(e) {
    t.equal(true, true);
  }
});

test('getOptions({ src: directory })', function(t) {
  var opts = getOptions({
    src: 'input/direct',
    dest: 'output'
  });

  t.plan(2);
  t.equal(opts.src, 'input/direct/**/*');
  t.equal(opts.dest, 'output');
});

test('getOptions({ src: path })', function(t) {
  var opts = getOptions({
    src: 'input/direct/*',
    dest: 'output'
  });

  t.plan(2);
  t.equal(opts.src, 'input/direct/*');
  t.equal(opts.dest, 'output');
});