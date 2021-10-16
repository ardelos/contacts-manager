namespace ContactsManager.Infrastructure.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Net.Mail;

    public class Contact : IValidatableObject
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Surname is required"), MaxLength(100)]
        public string Surname { get; set; }
        [Required(ErrorMessage = "Firstname is required"), MaxLength(100)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Date of Birth is required")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }



        /// <summary>
        /// Custom model validation before saving to DB 
        /// Email validation using MailAddress construct
        /// Date Of Birth Validation for null and (default date MinValue) and not in the future (day)
        /// </summary>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (isValidBirthDate(DateOfBirth))
            {
                yield return new ValidationResult(
                    "Please input valid Date Of Birth",
                    new[] { nameof(DateOfBirth) });
            }

            if (!IsValidEmailAddress(Email))
            {
                yield return new ValidationResult(
                    "Please input valid Email address",
                    new[] { nameof(Email) });
            }
            if (IsValidNameValue(FirstName, 100))
            {
                yield return new ValidationResult(
                    "Please input valid First Name",
                    new[] { nameof(FirstName) });
            }
            if (IsValidNameValue(Surname, 100))
            {
                yield return new ValidationResult(
                    "Please input valid Surname",
                    new[] { nameof(Surname) });
            }

        }

        bool IsValidEmailAddress(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        bool IsValidNameValue(string value, int size)
        {
            return string.IsNullOrEmpty(value) || value.Length > size;
        }

        bool isValidBirthDate(DateTime birthDate)
        {
            return DateOfBirth.Date > DateTime.UtcNow.Date || DateOfBirth == DateTime.MinValue;
        }
    }
}
