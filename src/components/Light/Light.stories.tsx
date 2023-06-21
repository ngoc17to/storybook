import type {Meta, StoryObj} from '@storybook/react';
import Light from './Light';
const meta: Meta<typeof Light> = {
    component: Light,
    title: 'Test/Light',
    tags: ['autodocs'],
    argTypes:{
        variant: {
            control: {type: 'radio'},
            options: ['green', 'yellow', 'red'],
        }
    }
}
export default meta;

type Story = StoryObj<typeof meta>;
/** This is how default look */
export const Base: Story = {
    args: {
        variant: 'green'
    }
}

export const Yellow: Story = {
    args: {
        variant: 'yellow'
    }
}

export const Red: Story = {
    args: {
        variant: 'red'
    }
}

export const Grouped: Story = {
    render: () => <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        border: '1px solid black',
        width: 'max-content',
        padding: 10
    }}>
        <Light variant='red' />
        <Light variant='yellow' />
        <Light variant='green' />
    </div>
}