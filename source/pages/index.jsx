import React from 'react';

import PageRoot from '../tags/PageRoot/PageRoot';
import Heading from '../tags/Heading/Heading';
import Rhythm from '../tags/Rhythm/Rhythm';
import Wrapper from '../tags/Wrapper/Wrapper';
import ComponentList from '../styleguide/components/ComponentList';

export default ({ locals }) => (
	<PageRoot title="Hello World">
		<Wrapper>
			<Rhythm size="large">
				<Heading level="1">Hello World</Heading>

				<Rhythm size="small" deep="true">
					<Heading level="3">Tags</Heading>
					<ComponentList baseUrl="/styleguide/tags" components={locals.tags} />
				</Rhythm>

				<Rhythm size="small" deep="true">
					<Heading level="3">Components</Heading>
					<ComponentList baseUrl="/styleguide/components" components={locals.components} />
				</Rhythm>

				<Rhythm size="small">
					<Heading level="2">Pages</Heading>
					<p>n/a</p>
				</Rhythm>
			</Rhythm>
		</Wrapper>
	</PageRoot>
)
