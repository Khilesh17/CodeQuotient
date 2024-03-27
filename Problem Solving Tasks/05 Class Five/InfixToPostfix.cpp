#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int prec(char ch){
        
        if(ch == '+' || ch == '-') return 1;
        else if(ch == '*' || ch == '/') return 2;
        else if(ch == '^') return 3;
        else return -1;
    }
  
    // Function to convert an infix expression to a postfix expression.
    string infixToPostfix(string str) {
        
        string ans = "";
        stack<char> s;
        
        for(int i = 0; i<str.size(); i++){
            
            char curr = str[i];
            
            //There are four case in any infix expression
            
            // case 1 : opening bracket : direct push in stack
            if(curr == '(') {
                s.push(curr);
            }
            // case 2 : operand : print it
            else if(('a' <= curr && curr <= 'z') ||
                    ('A' <= curr && curr <= 'Z') ||
                    ('0' <= curr && curr <= '9')){
                ans.push_back(curr);
            } 
            // case 3 : closing bracket : poping till we get opening bracket
            else if(curr == ')'){
                
                while(!s.empty() && s.top() != '('){
                    ans.push_back(s.top());
                    s.pop();
                }
                s.pop();
            }
            // case 4 : operator : if precedence of top is greater then pop the top
            else{
                
                while(!s.empty() && prec(curr) <= prec(s.top())){
                    ans.push_back(s.top());
                    s.pop();
                }
                
                s.push(curr);
            }
        }
        
        // in the end printing all the oprator of the stack      
        while(!s.empty()){
            ans.push_back(s.top());
            s.pop();
        }

        return ans;
    }
};


int main() {
    
    Solution solve;

    string expression;

    cout << "Enter Your Expression : " << endl;
    cin >> expression;

    cout << "After Conversion : " << solve.infixToPostfix(expression) << endl;

    return 0;
}

// } Driver Code Ends