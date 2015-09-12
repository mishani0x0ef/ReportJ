using System;
using System.Linq;
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
                var test = new Test();
                var commits = test.GetLastCommits(args == null || !args.Any() ? defaultRepoUrl : args[0], 10);
                foreach (var commit in commits)
                {
                    Console.WriteLine("Author: {0}; Message: '{1}', Date: {2}", commit.Author, commit.Message, commit.Date);
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
