namespace LagerWebb.Models
{
    public class ChangeLog
    {
        public int ChangeLogId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string HttpMethod { get; set; } = string.Empty;
        public string Endpoint { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; }
    }
}
