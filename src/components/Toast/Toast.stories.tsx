import type {Meta, StoryObj} from '@storybook/react';

import ToastComponent from './ToastComponent';

import '../Modal/Modal.css';
import '../../App.css';

const meta: Meta<typeof ToastComponent> = {
    component: ToastComponent,
    title: 'Components/Toast',
    tags: ['autodocs'],
}
export default meta;

type Story = StoryObj<React.FC>;

const toastText: {message: string, type: string, id:string}[] = [
    { message: 'This is success toast', type: 'success', id: '' },
    { message: 'This is warning toast', type: 'warning', id: '' },
    { message: 'This is error toast', type: 'error', id: '' },
];

export const Default: Story = {
    render: () => <ToastComponent toastText={toastText}/>
}