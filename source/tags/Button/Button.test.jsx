import test from 'tape';
import { shallow } from 'enzyme';

import Button from './Button';


test('<Button>', (t) => {
  const component = shallow(<Button>Hello World</Button>);
  t.ok(component.is('button'), 'tag name');
  t.ok(component.is('.Button'), 'tag class');
  t.ok(component.is('.Button--default'), 'variant class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});

test('<Button href="#/">', (t) => {
  const component = shallow(<Button href="#/">Hello World</Button>);
  t.ok(component.is('a'), 'tag name');
  t.ok(component.is('.Button'), 'tag class');
  t.ok(component.is('.Button--link'), 'variant class');
  t.equal(component.prop('href'), '#/', 'prop');
  t.end();
});

test('<Button tagName="div">', (t) => {
  const component = shallow(<Button tagName="div">Hello World</Button>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.Button'), 'tag class');
  t.ok(component.is('.Button--default'), 'variant class');
  t.end();
});

test('<Button tagName="div" className="superduper">', (t) => {
  const component = shallow(<Button tagName="div" className="superduper">Hello World</Button>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.Button'), 'tag class');
  t.ok(component.is('.Button--default'), 'variant class');
  t.ok(component.is('.superduper'), 'prop class');
  t.end();
});

test('<Button variant="cta">', (t) => {
  const component = shallow(<Button variant="cta">Hello World</Button>);
  t.ok(component.is('button'), 'tag name');
  t.ok(component.is('.Button'), 'tag class');
  t.ok(component.is('.Button--cta'), 'variant class');
  t.end();
});

test('<Button href="#/" variant="cta">', (t) => {
  const component = shallow(<Button href="#/" variant="cta">Hello World</Button>);
  t.ok(component.is('a'), 'tag name');
  t.ok(component.is('.Button'), 'tag class');
  t.ok(component.is('.Button--link'), 'variant class');
  t.ok(component.is('.Button--cta'), 'variant class');
  t.equal(component.prop('href'), '#/', 'prop');
  t.end();
});
