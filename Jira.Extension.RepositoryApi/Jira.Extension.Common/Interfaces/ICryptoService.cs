namespace Jira.Extension.Common.Interfaces
{
    public interface ICryptoService
    {
        IKeyProvider KeyProvider { get; set; }

        string Encrypt(string target);
        string Decrypt(string target);
    }
}
