#include <bits/stdc++.h>
using namespace std;


class Stack{
    public:
        char *arr;
        int top;
        int size;

        Stack(int s){
            this->size = s;
            arr = new char[s];
            top = -1;
        }


    void push(int element){
        if(size-top > 1){
            top++;
            arr[top] = element;
        }
        else{
            cout << "Stack is overflow" << endl;
        }
    }

    void pop(){
        if(top >= 0){
            top--;
        }
        else{
            cout << "Stack is underflow" << endl;
        }
    }

    int peek(){
        if(top >= 0){
            return arr[top];
        }
        else{
            return -1;
        }

    }

    bool empty(){
        if(top == -1){
            return true;
        }
        else{
            return false;
        }
    }
};



class Solution {
  public:
    int prec(char ch){
        
        if(ch == '+' || ch == '-') return 1;
        else if(ch == '*' || ch == '/') return 2;
        else if(ch == '^') return 3;
        else return -1;
    }

    
    string infixToPostfix(string str) {
        
        string ans = "";
        int size = str.size();
        Stack s(size);
        
        for(int i = 0; i<size; i++){
            
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
                
                while(!s.empty() && s.peek() != '('){
                    ans.push_back(s.peek());
                    s.pop();
                }
                s.pop();
            }
            // case 4 : operator : if precedence of top is greater then pop the top
            else{
                
                while(!s.empty() && prec(curr) <= prec(s.peek())){
                    ans.push_back(s.peek());
                    s.pop();
                }
                
                s.push(curr);
            }
        }
        
        // in the end printing all the oprator of the stack      
        while(!s.empty()){
            ans.push_back(s.peek());
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