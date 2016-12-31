namespace MarcarRecitativos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Recitativoes",
                c => new
                    {
                        RecitativoID = c.Int(nullable: false, identity: true),
                        RecitativoGUID = c.Guid(nullable: false),
                        Gender = c.Int(nullable: false),
                        Total = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.RecitativoID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Recitativoes");
        }
    }
}
