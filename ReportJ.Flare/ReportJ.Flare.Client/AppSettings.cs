namespace ReportJ.Flare.Client
{
    public class AppSettings
    {
        private static readonly object _locker = new object();
        private static AppSettings _instance;

        public static AppSettings Instance
        {
            get
            {
                if (_instance != null)
                    return _instance;

                lock (_locker)
                {
                    return _instance ?? (_instance = new AppSettings());
                }                
            }
        }

        private AppSettings()
        {
        }

        public string ApiBaseAddress => "http://localhost:1062/";
    }
}
