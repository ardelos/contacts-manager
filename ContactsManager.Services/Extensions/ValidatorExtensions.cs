
namespace ContactsManager.Services.Extensions
{
    using ContactsManager.Services.Exceptions;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    public static class ValidatorExtensions
    {
        /// <summary>
        /// Prevalidation of custom validation rules for entity
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        public static void AssertEntityValidationResult<T>(this T entity) where T : class
        {
            var context = new ValidationContext(entity);
            var results = new List<ValidationResult>();
            var valid = Validator.TryValidateObject(entity, context, results);
            if (valid) return;
            throw new BadRequest(string.Join(Environment.NewLine, results.Select(r => r.ErrorMessage)));
        }
    }
}
