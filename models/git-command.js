class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        /*
            For assignment #1:
            Create logic here and run unit testing.
        */
        const paths = Object.keys(this.working_directory.files);
        if(paths.length) {
            let status = `You have ${paths.length} change/s.`;
            for(const path of paths) {
                status += `\n${path}`;
            }
            return status;
        } else {
            return 'You have 0 change/s.\n';
        }

    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        } else if(path_file === '.') {
            this.working_directory.files = {};
            return "Successfully added as index file/s.";
        } else if(path_file === '*') {
            for(const file in this.working_directory.files) {
                if(this.working_directory.files[file].location[0] !== '.') {
                    delete this.working_directory.files[file];
                }
            }
            return "Successfully added as index file/s.";
        }
       
        /*
            For assignment #2:
            Create logic here and run unit testing.
            Don't forget to uncomment the unit tests.
        */
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;