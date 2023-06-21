import type {Meta, StoryObj} from '@storybook/react';

import UploadImage from './UploadImage';
import './UploadImage.css';
import '../../App.css';

const meta: Meta<typeof UploadImage> = {
    component: UploadImage,
    title: 'Components/Upload Image',
    tags: ['autodocs'],
}
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => 
        <UploadImage />
}

export const WithDefaultImage: Story = {
    args: {
        src: 'src/img/97.jpg'
    },
    render: (args) => <UploadImage src={args.src} />
}

