import React from 'react';
// Generic form processing component. 
export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  // Subverts default behavior for submit() function provided by parent component. 
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  // Subverts default behavior for cancel() function provided by parent component. 
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }
  
  // Displays the form based on parent specifications. 
  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// Generic wrapper for errors to be displayed should they propagate
// from the server. 
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
