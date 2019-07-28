namespace DBcontentEmployee.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DBcontentEmployee.Content.EmployeesDbcontent>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DBcontentEmployee.Content.EmployeesDbcontent context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            //insert data in seed ...
            context.Employees.AddOrUpdate(
                new Model.Employess { CreateDate = DateTime.Now, Name = "Micel", Salary = 36000, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "Nnana", Salary = 56000, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "Math", Salary = 16000, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "hile", Salary = 36500, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "Miczal", Salary = 36000, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "chancel", Salary = 360200, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "celcol", Salary = 36000, Statue = true }, 
                new Model.Employess { CreateDate = DateTime.Now, Name = "cel", Salary = 36000, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "Micelzenny", Salary = 360200, Statue = true },
                new Model.Employess { CreateDate = DateTime.Now, Name = "elzy", Salary = 36000, Statue = true }, 
                new Model.Employess { CreateDate = DateTime.Now, Name = "Mopecel", Salary = 36000, Statue = true }

                );

            context.SaveChanges();
        }
    }
}
