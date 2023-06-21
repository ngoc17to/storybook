import type {Meta, StoryObj} from '@storybook/react';

import { AdvancedSelectOption } from './type';
import AdvancedSelect from './AdvancedSelect';
import './AdvancedSelect.css';
import '../../App.css';

const meta: Meta<typeof AdvancedSelect> = {
    component: AdvancedSelect,
    title: 'Components/Advanced Select',
    tags: ['autodocs'],
}
export default meta;

type Story = StoryObj<typeof meta>;

const options: AdvancedSelectOption[] = [
    { id: '1', label: 'option 1' },
    { id: '2', label: 'option 2' },
    { id: '3', label: 'option 3' },
    { id: '4', label: 'option 4' },
    { id: '5', label: 'huhuhuhuhuh' },
    { id: '6', label: 'hihihihihihhhihi' },
    { id: '7', label: 'hehehe' },
];

/**Default AdvancedSelect's behavior is 'searchable' with 'local' search mode. */
export const Default: Story = {
    render: () => 
        <AdvancedSelect
            options={options}
            isMultiple = {false}
        />
}

/**There are no options show when user click on disabled AdvancedSelect. It's enabled with "disabled" props. */
export const Disabled: Story = {
    args: {
        disable: true,
        placeholder: 'Vui lòng chọn...'
    },
    render: (args) => <AdvancedSelect
    options={options}
    placeholder = {args.placeholder}
    isMultiple = {false}
    disable = {args.disable}
/>
}

/**An AdvancedSelect component can handle multiple selections. It's enabled with "multi" props.*/
export const Multiple: Story = {
    args: {
        disable: false,
        isMultiple: true,
        placeholder: 'Vui lòng chọn...'
    },
    render: (args) => <AdvancedSelect
    options={options}
    placeholder = {args.placeholder}
    isMultiple = {args.isMultiple}
    disable = {args.disable}
/>
}

/**An AdvancedSelect's options list can have a list of default value.*/
export const WithDefaultValue: Story = {
    args: {
        disable: false,
        isMultiple: true,
        defaultValue: ['1', '2'],
        placeholder: 'Vui lòng chọn...'
    },
    render: (args) => <AdvancedSelect
    options={options}
    placeholder = {args.placeholder}
    defaultValue={args.defaultValue}
    isMultiple = {args.isMultiple}
    disable = {args.disable}
/>
}