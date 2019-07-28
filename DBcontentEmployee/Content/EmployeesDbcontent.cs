using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DBcontentEmployee.Model;

namespace DBcontentEmployee.Content
{
    class EmployeesDbcontent : DbContext
    {
        public EmployeesDbcontent():base("EmployeeConectionString")
            {

            }
            public DbSet<Employess> Employees { get; set; }
    }
   
}
