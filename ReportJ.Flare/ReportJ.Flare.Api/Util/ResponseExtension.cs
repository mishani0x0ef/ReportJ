using System.Net.Http;

namespace ReportJ.Flare.Api.Util
{
    public static class ResponseExtension
    {
        public static HttpResponseMessage AddVersion(this HttpResponseMessage response)
        {
            if (response == null) return response;

            var version = AppSettings.Instance.Version;
            response.Headers.Add("api-version", $"{version.Major}.{version.Minor}");
            return response;
        }
    }
}
