using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.Documents.Dto
{
    public class CreateDocumentInput
    {
        [Required]
        [MaxLength(DocumentConsts.MaxTitleLength)]
        public string Title { get; set; }
    }

}
