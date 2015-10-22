//CS326 - Team Oriole

//////////////////////////////////////////////////////////////////////
// The team library //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * The `member` function creates a new team member.
 *
 * You should use this function to create new "team members". It is a
 * utility function that can be used in other library routines to
 * create new members. It is a useful technique to abstract the
 * creation of data from the actual data representation itself. In
 * this case a *member* is an object with four important properties:
 *
 * `user`: The username of the member. This should be the username
 * of the team member used to login to UMass Spire, Moodle, etc. You
 * will need to ask your fellow team members for their username.
 * `fname`: The first name of a team member.
 * `lname`: The last name of a team member.
 * `year`: Their current year of college (freshman, sophomore, junior, senior)
 *
 * We give you the implementation of this!
 *
 * @param  {string} user  the team member's username
 * @param  {string} fname the team member's first name
 * @param  {string} lname the team member's last name
 * @param  {string} year  the team member's year of college
 * @return {object} { user, fname, lname, year }
 */
function member(user, fname, lname, year, description) {
    return {
        user: user,
        fname: fname,
        lname: lname,
        year: year,
        description: description
    };
}

// This library contains an internal data structure for recording
// team members. It is an array of member objects. You should add an
// entry for each of your team members. You should use the `member`
// function to easily create a new member object.
var team = [
    // Keep this first member for testing please.
    member('jdoe', 'John', 'Doe', 'senior', "doedoe"),

    // Addition of team members
    member('dhnguyen', 'David', 'Nguyen', 'senior',
      'Lorem Ipsum'),
    member('tdnguyen', 'Tommy', 'Nguyen', 'junior',
      'Hi I’m Tommy and I’m a junior studying Computer Science. My role in the team will be working on back-end development for FyF. I have done some front-end development before and would like to experience the full stack! I will be working with Sam and Joe for the backend. I like cookies.'),
    member('jinhuiliang', 'Evans', 'Liang', 'junior',
      'Lorem Ipsum'),
    member('slambrou', 'Steven', 'Lambrou', 'senior',
      'Hi I’m Steven and I’m a senior in Computer Science I’ve always been interested in game development and Artificial Intelligence.  My role in the team will be working on front-end development for FyF with Evans and David.'),
    member('mccaffre', 'Joe', 'McCaffrey', 'senior',
      'I’m Joe,I’m a senior Math and CS major at UMass. My interests include scientific computing, operating systems and networks so web development is new for me. My role will be working on the back end of FyF and supporting other teammates.'),
    member('sorloff', 'Samuel', 'Orloff', 'senior',
      'I’m Samuel, and I’ve been a Junior in CS for as long as I can remember. I’m interested in AI and space, and I’ve minimal experience working with web programming in the past. I’ll be working with Joe and Tommy on the back-end for FyF.')

];

/**
 * `copy` makes a copy of a member object. This is useful as we do not
 * want to leak our internal member data structures outside of this
 * library. It must be used by the `find` function below to return
 * new/distinct copies of a member object.
 *
 * @param  {member object} member a member object
 * @return {member object}        a copy of member
 */
function copy(memberVar) {
    // Copies member object if member object is of correct type and not null
    if(memberVar != null || typeof obj !== 'object') {
        return member(memberVar.user, memberVar.fname, memberVar.lname, memberVar.year, memberVar.description);
    }
    else{
        return null;
    }
}

/**
 * `copyAll` returns a copy of all team members in a new array. It
 * relies on your implementation of `copy` to do this.
 *
 * We give you this one!
 *
 * @param  {array} members an array of member objects
 * @return {array}         a copy of the array of member objects
 */
function copyAll(members) {
    var nmembers = [];
    members.forEach(m => {
        nmembers.push(copy(m));
});
return nmembers;
}

/**
 * The `result` function is another utility function used to return
 * a "result" object to the caller of this library. Again, a useful
 * technique is to abstract out the creation of an object from its
 * internal representation. In this case, we create a "result" object
 * with four important properties:
 *
 * `success`: this is a boolean indicating if the result is a
 * successful response. true if it is; false otherwise.
 * `message`: this is an informational message that is helpful to
 * the caller to understand the success or failure of the result.
 * `data`: this is the actual data that is returned. In our case the
 * data will always be an array of members.
 * `count`: this is the number of members in the result - this is
 * derived from the number of entries in `data`.
 *
 * @param  {boolean} success true if success; false otherwise
 * @param  {string}  message informational message
 * @param  {array} 	 data    array of members
 * @return {object}          result object
 */
function result(success, message, data) {
    return {
        success: success,
        message: message,
        data: data,
        count: data.length
    };
}

/**
 * `find` is used to lookup a member by their username. It returns
 * a member object if it is found or `null` if it is not.
 *
 * You need to implement this function. You should iterate over the
 * team array looking for the member with the correct username. If the
 * member is found you should return the member object. If it is not
 * found it should return `null`.
 *
 * Make sure you use `copy` to produce a copy of the member object if
 * one is found for the given `user`.
 *
 * @param  {string} user the member's username
 * @return {object}      the member object or `null` if not found
 */
function find(user) {
    // Searches through team array to match usernames. Returns member object if found, otherwise return null
    for(var i = 0; i < team.length; i++){
        if(user == team[i].user) {
            return copy(team[i]);
        }
    }
    return null;
}

/**
 * `all` returns a result object containing all of the team members.
 * This function always returns `true` as it will always return an
 * array of all the members. Even if there are no members in the team
 * it will return `true` with an empty array. You should use the
 * `result` function to create a result object. The message to the
 * `result` function should be 'team members' (the unit tests will
 * test this).
 *
 * The array of team members returned should be a copy of the original
 * array of team members. `copyAll` is a useful function for this.
 *
 * @return {result object}  a result object
 */
function all() {
    // Returns result object with success message and copy of team members
    return result(true, 'team members', copyAll(team));
}

/**
 * `one` returns a result object containing the team member that was
 * found. This function should check to make sure that the argument
 * `user` passed to it is a string - remember, this is a dynamically
 * typed language so we need to do the type checking manually.
 *
 * If `user` is not a string you must return a result object
 * indicating failure, a useful message, and an empty array. Use the
 * `result` function to do this.
 *
 * Otherwise, you must use the `find` function to find the member. If
 * the member is not found, return a new result object
 * indicating failure, the message 'team member not found', and an
 * empty array.
 *
 * If the member is found, return a result object indicating success,
 * the message 'team member found', and an array containing the single
 * member.
 *
 * @param  {string} user    the username of a team member
 * @return {result object}  a result object
 */
function one(user) {
    // Empty array
    var memberArray = [];

    //Checks if user is of string type
    if(typeof user === 'string'){
        // Checks if member object is not null
        if(find(user) != null){
            // Pushes member object into array
            memberArray.push(find(user));
            // Returns result object with success message and array containing member object
            return result(true, 'team member found', memberArray);
        }
        else{
            // Returns failure if team member is not found in array
            return result(false, 'team member not found',memberArray);

        }
    }
    else{
        // Returns failure if username is of string value
        return result(false, 'FAILED: Username not a string',memberArray);
    }

}

// This exports public functions to the outside world.
exports.all = all;
exports.one = one;
