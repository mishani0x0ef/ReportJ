using System;
using System.Security.Cryptography;
using System.Text;
using Jira.Extension.Common.Interfaces;
using Microsoft.Practices.Unity;

namespace Jira.Extension.Common.Services
{
    public class RsaCryptoService : ICryptoService
    {
        [Dependency]
        public IKeyProvider KeyProvider { get; set; }

        public string Decrypt(string encryptedStr)
        {
            using (var rsa = new RSACryptoServiceProvider())
            {
                rsa.FromXmlString(KeyProvider.GetKeyXml());

                var data = Convert.FromBase64String(encryptedStr);
                var decryptedData = rsa.Decrypt(data, false);
                var result = Encoding.UTF8.GetString(decryptedData);
                for (var i = 0; i < data.Length - 1; i++)
                {
                    data.SetValue((byte) 0, i);
                }
                for (var i = 0; i < decryptedData.Length - 1; i++)
                {
                    decryptedData.SetValue((byte) 0, i);
                }
                return result;
            }
        }

        public string Encrypt(string sourceStr)
        {
            using (var rsa = new RSACryptoServiceProvider())
            {
                rsa.FromXmlString(KeyProvider.GetKeyXml());

                var data = Encoding.UTF8.GetBytes(sourceStr);
                var encryptedData = rsa.Encrypt(data, false);
                var text = Convert.ToBase64String(encryptedData);

                for (var i = 0; i < data.Length - 1; i++)
                {
                    data.SetValue((byte)0, i);
                }
                for (var i = 0; i < encryptedData.Length - 1; i++)
                {
                    encryptedData.SetValue((byte)0, i);
                }
                return text;
            }
        }
    }
}
