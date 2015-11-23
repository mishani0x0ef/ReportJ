using System;
using System.IO;
using Jira.Extension.Common.Interfaces;

namespace Jira.Extension.Common.Services
{
    public class FileKeyProvider : IKeyProvider
    {
        public string KeyFilePath { get; set; }

        public FileKeyProvider(string keyFilePath)
        {
            KeyFilePath = keyFilePath;
        }

        public string GetKeyXml()
        {
            if (!File.Exists(KeyFilePath))
            {
                throw new ArgumentException(string.Format("Cannot find file with key by path '{0}'. File does not exist.", KeyFilePath));
            }

            var keyXml = File.ReadAllText(KeyFilePath);
            return keyXml;
        }
    }
}
