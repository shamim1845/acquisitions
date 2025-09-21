export const formatValidationError = errors => {
  if (!errors || !errors.issues) return 'Validation failed!';

  if (Array.isArray(errors.issues)) {
    return errors.issues
      .map(issue => {
        const field =
          issue.path && issue.path.length ? issue.path.join('.') : 'field';
        return `${field}: ${issue.message}`;
      })
      .join('; ');
  }

  return JSON.stringify(errors);
};
