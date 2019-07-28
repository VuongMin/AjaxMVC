using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBcontentEmployee.Model
{
    [Table("Employees")]
    class Employess
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ID { get; set; }
        [StringLength(255)]
        [Column(TypeName ="nvarchar")]
        [Required]
        public string Name { get; set; }
     
        public double Salary { get; set; }
        public bool Statue { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}
