// components/styles/InputFieldStyles.ts
export const inputFieldStyles = {
  inputContainer: {
    flexDirection: 'row' as 'row', // Explicit type for flexDirection
    alignItems: 'center' as 'center', // Explicit type for alignItems
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center', // Explicit type for alignItems
  },
  enabledButton: {
    backgroundColor: '#0a7ea4',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
};
