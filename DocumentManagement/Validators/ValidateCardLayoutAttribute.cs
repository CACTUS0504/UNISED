using System.ComponentModel.DataAnnotations;
using DocumentManagement.DTO;
using DocumentManagement.Models;

namespace DocumentManagement.Validators;

public class ValidateCardLayoutAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext context)
    {
        var layout = value as DocumentLayout;
        if (layout == null || !layout.Tabs.Any())
            return new ValidationResult("Должна быть хотя бы одна вкладка");

        // Получаем DTO из контекста
        var dto = context.ObjectInstance as CreateDocumentCardTypeDTO;
        if (dto?.Fields == null || !dto.Fields.Any())
            return new ValidationResult("Нет полей для разметки");

        var errors = new List<string>();
        var allTemplateFields = new List<string>();
        var allDefinedFields = dto.Fields.Select(f => f.Name).ToList();

        // 1. Проверяем все вкладки, строки и поля в разметке
        for (int t = 0; t < layout.Tabs.Count; t++)
        {
            var tab = layout.Tabs[t];
            if (string.IsNullOrWhiteSpace(tab.Name))
                errors.Add($"Вкладка #{t + 1}: Название обязательно");

            if (!tab.Rows.Any())
                errors.Add($"Вкладка #{t + 1}: Должна быть хотя бы одна строка");

            for (int r = 0; r < tab.Rows.Count; r++)
            {
                var row = tab.Rows[r];
                if (!row.Fields.Any())
                    errors.Add($"Вкладка #{t + 1}, строка #{r + 1}: Должно быть хотя бы одно поле");

                for (int f = 0; f < row.Fields.Count; f++)
                {
                    var field = row.Fields[f];
                    if (string.IsNullOrWhiteSpace(field.Name))
                    {
                        errors.Add($"Вкладка #{t + 1}, строка #{r + 1}, поле #{f + 1}: Имя поля обязательно");
                        continue;
                    }

                    // Проверяем что поле существует в определении полей
                    if (!allDefinedFields.Contains(field.Name))
                    {
                        errors.Add($"Поле '{field.Name}' не определено в списке полей документа");
                    }

                    allTemplateFields.Add(field.Name);
                }
            }
        }

        // 2. Проверяем что ВСЕ определенные поля имеют разметку
        var missingFields = allDefinedFields.Except(allTemplateFields).ToList();
        if (missingFields.Any())
        {
            errors.Add($"Следующие поля не имеют разметки: {string.Join(", ", missingFields)}");
        }

        return errors.Any()
            ? new ValidationResult(string.Join("; ", errors))
            : ValidationResult.Success;
    }
}