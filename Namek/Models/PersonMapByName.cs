using CsvHelper.Configuration;

namespace Namek.Models
{
    public class PersonMapByName : ClassMap<Person>
    {
        public PersonMapByName()
        {
            Map(p => p.FirstName).Name("名");
            Map(p => p.LastName).Name("姓");
            Map(p => p.Age).Name("年齢");
            Map(p => p.IsActive).Name("アクティブ");
            Map(p => p.Time).TypeConverterOption.Format("HH:ss").Name("打設完了");
        }
    }
}
