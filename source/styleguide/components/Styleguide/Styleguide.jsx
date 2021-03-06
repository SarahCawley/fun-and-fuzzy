import React from 'react';
import slugify from 'slugify';

import Heading from 'SgTags/Heading/Heading';
import Skeleton from 'SgTags/Skeleton/Skeleton';
import Example from 'SgTags/Example/Example';
import Rhythm from 'SgTags/Rhythm/Rhythm';


export const Styleguide_Readme = ({ readme }) => (
  <div id="readme" className="sg-styleguide__section">
    <div className="sg-styleguide__section-header">
      <Heading level="2">Readme</Heading>

      <div
        className="sg-styleguide__readme"
        dangerouslySetInnerHTML={{ __html: readme }}
      />
    </div>
  </div>
);

Styleguide_Readme.propTypes = {
  readme: React.PropTypes.string
};


export const Styleguide_Tests = ({ tests }) => (
  <div id="tests" className="sg-styleguide__section">
    <Rhythm className="sg-styleguide__section-header">
      <Heading level="2">Tests</Heading>

      <Rhythm size="small">
        { tests
          .filter(e => !(e.options && e.options.hidden))
          .map(e =>
            <div key={e.name}>
              <a
                href={`#${slugify(e.name)}`}
                key={slugify(e.name)}
                value={slugify(e.name)}
              >
                {e.name}
              </a>
            </div>

          )}
      </Rhythm>
    </Rhythm>

    { tests
      .filter(e => !(e.options && e.options.hidden))
      .map(e =>
        <Example
          key={slugify(e.name)}
          slug={slugify(e.name)}
          tagName={e.name}
          exampleName={e.name}
          component={e.component}
          options={e.options}
        />) }
  </div>
);

Styleguide_Tests.propTypes = {
  tests: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    options: React.PropTypes.object,
    component: React.PropTypes.element
  }))
};


export const Styleguide = ({
  name = 'Generic Component',
  readme,
  locals = {},
  tests
}) => (
  <Skeleton className="sg-styleguide" title={`${name} – Styleguide`} locals={locals}>
    <div className="sg-styleguide__header sg-styleguide-section__header">
      <Heading level="1">{name}</Heading>
    </div>

    { readme ? <Styleguide_Readme readme={readme} /> : undefined }
    { tests ? <Styleguide_Tests tests={tests} /> : undefined }
  </Skeleton>
);

Styleguide.propTypes = {
  name: React.PropTypes.string,
  readme: React.PropTypes.string,
  locals: React.PropTypes.object,
  tests: React.PropTypes.array
};


export default Styleguide;
