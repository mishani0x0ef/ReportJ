if("undefined"==typeof jQuery)throw new Error("Repository API JavaScript requires jQuery");

var RepositoryApi = function(){
    var svnApiUrl = "http://localhost/Jira.Extension.RepositoryApi/svn/";
    
    /**
    * Get last commits availalbe for particular SVN repository.
    * @param {options} select options (repoUrl, userName, password, count, author).
    * @param {handler} callback function which handle response from server.
    * @return {void} do not return data.
    */
    this.getLastSvnCommits = function(options, handler){
        var apiUrl = svnApiUrl + "commits/test";
        $.ajax({
            dataType: "json",
            url: apiUrl,
            data: {
                username: options.userName, 
                password: options.password, 
                repo: options.repoUrl, 
                count: options.count, 
                author: options.author},
            success: function(commits){
                $.each(commits, function(index, commit) {
                    commit.Date = new Date(commit.Date);
                })
                handler(commits);
            }
        });
    };
}