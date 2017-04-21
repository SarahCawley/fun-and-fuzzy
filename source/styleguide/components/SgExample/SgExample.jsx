import Dom from 'react-dom/server';
import reactElementToString from 'react-element-to-jsx-string';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import { pd } from 'pretty-data';

import SgHeading from 'SgTags/SgHeading/SgHeading';

const filterProps = (component) => {
  const copy = {
    type: component.type.name,
    props: Object.assign({}, component.props)
  };

  const processChild = (child) => (
    Object.keys(child)
      .filter((key) => !(child[key] === null || Object.keys(child[key]).length === 0))
      .reduce((sum, key) => {
        if (key === 'props' && child.props.children !== undefined) {
          let children = child.props.children;

          if (Array.isArray(children)) {
            children = child.props.children.map(processChild);
          } else if (typeof children === 'object') {
            children = processChild(children);
          }

          sum.props = Object.assign({ }, child.props, { children });
        } else if (key === 'type') {
          if (child.type && child.type.name) sum.type = child.type.name;
          else sum.type = child.type;
        } else {
          sum[key] = child[key];
        }

        return sum;
      }, { })
  );


  if (Array.isArray(copy.props.children)) {
    copy.props.children = copy.props.children.map(processChild);
  }

  return copy;
};


export const SgExample_Section = (props) => {
  const {
    type,
    className,
    children,
    isActive,
    ...attrs
  } = props;

  const classStack = FcUtils.createClassStack([
    'SgExample__section',
    `SgExample__section--${type}`,
    isActive && 'is-active',
    className
  ]);

  return (
    <div className={classStack} {...attrs}>
      {children}
    </div>
  );
};

SgExample_Section.defaultProps = {
  isActive: false
};

SgExample_Section.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node
};


export const SgExample_Wrapper = (props) => {
  const {
    slug,
    children,
    ...attrs
  } = props;

  return (
    <div className="SgExample" {...attrs}>
      <a className="SgExample__anchor" id={slug}>&nbsp;</a>
      {children}
    </div>
  );
};

SgExample_Wrapper.propTypes = {
  slug: PropTypes.string,
  children: PropTypes.node
};


export const SgExample_Header = (props) => {
  const {
    exampleName,
    children,
    ...attrs
  } = props;

  return (
    <div className="SgExample__header" {...attrs}>
      <SgHeading level="h3" className="SgExample__name">{exampleName}</SgHeading>

      <ul className="SgExample__tabs">
        {children}
      </ul>
    </div>
  );
};

SgExample_Header.propTypes = {
  exampleName: PropTypes.string,
  children: PropTypes.node
};


export const SgExample_Tab = (props) => {
  const {
    slug,
    name,
    children,
    isActive,
    ...attrs
  } = props;

  const classStack = FcUtils.createClassStack([
    'SgExample__tabs-item',
    isActive && 'is-active'
  ]);

  return (
    <li className={classStack} {...attrs}>
      <a href={`#${slug}/${name}`}>{children}</a>
    </li>
  );
};

SgExample_Tab.propTypes = {
  slug: PropTypes.string,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node
};


export const SgExample = (props) => {
  const {
    slug,
    exampleName,
    options,
    component
  } = props;

  const reactExample = reactElementToString(component);
  const htmlExample = Dom.renderToStaticMarkup(component);
  const jsonExample = JSON.stringify(filterProps(component), null, 2);

  const exampleClassStack = FcUtils.createClassStack([
    options.fullWidth && 'SgExample__section--full-width',
    options.noPadding && 'SgExample__section--no-padding',
    options.darkBackground && 'SgExample__section--dark-background'
  ]);

  return (
    <SgExample_Wrapper slug={slug}>
      <SgExample_Header exampleName={exampleName}>
        <SgExample_Tab slug={slug} name="example" isActive>Example</SgExample_Tab>
        <SgExample_Tab slug={slug} name="react">React</SgExample_Tab>
        <SgExample_Tab slug={slug} name="html">HTML</SgExample_Tab>
        <SgExample_Tab slug={slug} name="json">JSON</SgExample_Tab>
      </SgExample_Header>

      <SgExample_Section
        title="Example"
        type="example"
        isActive
        className={exampleClassStack}
        dangerouslySetInnerHTML={{ __html: htmlExample }}
      />

      <SgExample_Section title="React" type="react">
        <SyntaxHighlighter language="html" style={github} customStyle={{ backgroundColor: 'transparent' }}>
          { reactExample }
        </SyntaxHighlighter>
      </SgExample_Section>

      <SgExample_Section title="HTML" type="html">
        <SyntaxHighlighter language="html" style={github} customStyle={{ backgroundColor: 'transparent' }}>
          { pd.xml(htmlExample) }
        </SyntaxHighlighter>
      </SgExample_Section>

      <SgExample_Section title="JSON" type="json">
        <SyntaxHighlighter language="json" style={github} customStyle={{ backgroundColor: 'transparent' }}>
          { jsonExample }
        </SyntaxHighlighter>
      </SgExample_Section>
    </SgExample_Wrapper>
  );
};

SgExample.defaultProps = {
  options: { }
};

SgExample.propTypes = {
  slug: PropTypes.string,
  exampleName: PropTypes.string,
  options: PropTypes.shape({
    fullWidth: PropTypes.bool,
    noPadding: PropTypes.bool,
    darkBackground: PropTypes.bool
  }),
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ])
};


export default SgExample;