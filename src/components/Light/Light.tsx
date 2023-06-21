type Props = {
  /** Some descriptions */
  variant?: 'green' | 'yellow' | 'red'
};

/** Some comment about my Light component */
const Light = ({variant = 'green'}: Props) => {
  return <div style={{padding: 20, background:variant, borderRadius: '50%', width: 20, height: 20}}></div>
};

export default Light;