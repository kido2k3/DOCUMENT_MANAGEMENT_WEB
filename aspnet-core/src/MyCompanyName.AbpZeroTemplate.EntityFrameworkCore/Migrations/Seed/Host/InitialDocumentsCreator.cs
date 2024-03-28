
using MyCompanyName.AbpZeroTemplate.Documents;
using MyCompanyName.AbpZeroTemplate.EntityFrameworkCore;
using System;
using System.Data;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.Migrations.Seed.Host
{
    public class InitialDocumentsCreator
    {
        private readonly AbpZeroTemplateDbContext _context;

        public InitialDocumentsCreator(AbpZeroTemplateDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            var douglas = _context.Documents.FirstOrDefault(p => p.Organization == "X1 hospital");
            if (douglas == null)
            {
                _context.Documents.Add(
                    new Document
                    {
                        Title = "Doc 1",
                        Code = "000001",
                        ReleaseDate = DateTime.Now,
                        Organization = "X1 hospital",
                        EffectiveDate = DateTime.Now,
                        ExpirationDate = new DateTime(2024, 2, 20),
                        Type = "Legal document"
                    });
            }

            var asimov = _context.Documents.FirstOrDefault(p => p.Organization == "X2 hospital");
            if (asimov == null)
            {
                _context.Documents.Add(
                    new Document
                    {
                        Title = "Doc 2",
                        Code = "000002",
                        ReleaseDate = DateTime.Now,
                        Organization = "X2 hospital",
                        EffectiveDate = DateTime.Now,
                        ExpirationDate = new DateTime(2024, 4, 30),
                        Type = "Legal document"
                    });
            }

            var d1 = _context.Documents.FirstOrDefault(p => p.Organization == "X3 hospital");
            if (d1 == null)
            {
                _context.Documents.Add(
                    new Document
                    {
                        Title = "Doc 3",
                        Code = "000003",
                        ReleaseDate = DateTime.Now,
                        Organization = "X3 hospital",
                        EffectiveDate= DateTime.Now,
                        ExpirationDate = new DateTime(2024, 4, 30),
                        Type = "Legal document"
                    });
            }
        }
    }
}
