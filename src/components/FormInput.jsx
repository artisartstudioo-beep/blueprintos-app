function FormInput({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="form-input-label">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
    </label>
  )
}

export default FormInput
