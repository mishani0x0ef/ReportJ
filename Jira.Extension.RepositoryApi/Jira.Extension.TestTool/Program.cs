using System;
using System.Linq;
using System.Net;
using Jira.Extension.Svn;

namespace Jira.Extension.TestTool
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var defaultRepoUrl = "test";
                var repositoryService = new SvnRepositoryService();
                var commits = repositoryService.GetLastCommits(args == null || !args.Any() ? defaultRepoUrl : args[0],
                    new NetworkCredential("test", "test"), "test");
                foreach (var commit in commits)
                {
                    Console.WriteLine("\nAuthor: {0}\nMessage: '{1}'\nDate: {2}", commit.Author, commit.Message, commit.Date);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            Console.ReadLine();
        }
    }
}
