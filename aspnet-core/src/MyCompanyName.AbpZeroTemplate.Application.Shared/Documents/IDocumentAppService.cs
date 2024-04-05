using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Documents.Dto;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Documents
{
    public interface IDocumentAppService : IApplicationService
    {
        ListResultDto<DocumentListDto> GetDocuments(GetDocumentsInput input);

        Task CreateDocument(CreateDocumentInput input);
        Task DeleteDocument(EntityDto input);

    }
}
