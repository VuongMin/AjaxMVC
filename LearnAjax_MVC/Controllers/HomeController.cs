using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using LearnAjax_MVC.Models;

namespace LearnAjax_MVC.Controllers
{
    public class HomeController : Controller
    {
        //Create a List Employess in to Data Load
        List<EmployessModel> listEmployess = new List<EmployessModel>
        {
            new EmployessModel()
            {
                 ID = "1",
                  Name="Jonh",  
                   Salary=2000,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "2",
                  Name="Mena",
                   Salary=6000,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "3",
                  Name="Naana",
                   Salary=2500,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "4",
                  Name="Lida",
                   Salary=3000,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "5",
                  Name="Duda",
                   Salary=3700,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "6",
                  Name="LiLi",
                   Salary=30800,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "7",
                  Name="Lidan",
                   Salary=3090,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "8",
                  Name="NatuLida",
                   Salary=32000,
                    Statue=true
            },
            new EmployessModel()
            {
                 ID = "9",
                  Name="LdaNa",
                   Salary=30200,
                    Statue=true
            }
        };
        public ActionResult Index()
        {

            return View();
        }
        //paging with ajax here
        public JsonResult LoadMydata(int page,int pagesize=5)
        {
            var Model = listEmployess.Skip((page - 1) * pagesize).Take(pagesize);
            int TotalRow = listEmployess.Count();
            return Json( new{
                //data=listEmployess,
                data=Model,
                statue=true,
                totalRow=TotalRow
            },JsonRequestBehavior.AllowGet);
                
        }
        [HttpPost]
        public JsonResult SaveData(string strEmployee)
        {
            //chuyển jsom qua oject
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            EmployessModel member = serializer.Deserialize<EmployessModel>(strEmployee);
            if(int.Parse( member.ID)==0)
            {
                listEmployess.Add(member);
               
            }else
            {
                var Entity = listEmployess.Single(x => x.ID == member.ID);
                Entity.Salary = member.Salary;
                Entity.Name = member.Name;
                Entity.Statue = member.Statue;
            }
           
            return Json(new
            {
                statue = true
            });

        }
        [HttpGet]
        public JsonResult getEmployeeDetail(string ID)
        {
            var model = listEmployess.Single(x => x.ID == ID);
            return Json(new
            {
                data=model,
                status = true
            }, JsonRequestBehavior.AllowGet);//always have to have JsonRequestBehavior.AllowGet
        }
        [HttpPost]
        public JsonResult deleteItem(string ID)
        {
            var model = listEmployess.Remove(listEmployess.Single(x=>x.ID==ID));
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);//always have to have JsonRequestBehavior.AllowGet
        }

    }
}