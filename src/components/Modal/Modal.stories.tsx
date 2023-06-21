import type {Meta, StoryObj} from '@storybook/react';

import ModalComponent from './ModalComponent';

import './Modal.css';
import '../../App.css';
import AlertComponent from './AlertComponent';

const meta: Meta<typeof ModalComponent> = {
    component: ModalComponent,
    title: 'Components/Modal',
    tags: ['autodocs'],
}
export default meta;

type Story = StoryObj<React.FC>;

export const Default: Story = {
    args: {
        title: 'This is a title',
        message: 'And this is your message!',
    },
    render: (args) => <ModalComponent 
        title={args.title} 
        message={args.message} 
    />
}
export const Alert: Story ={
    args: {
        title: 'This is an alert title',
        message: 'And this is your message!',
    },
    render: (args) => <AlertComponent 
        title={args.title} 
        message={args.message} 
    />
}
    