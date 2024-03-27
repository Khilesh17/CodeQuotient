#include<bits/stdc++.h>
using namespace std;

/*
{
    // using reccursion

    // Calculate factorial of a number - done
    // Find Nth fibbonaci number - done
    // Generate Fibonacchi series - done
    // Palindrome string - done
    // sum of elements in array - done
    // Max in array - done
    // Reverse a Linked list - done
    // generate all permutation of a string
}
*/

// Question 1 : 
int factorialOfNumber(int num){
    if(num == 0)
        return 1;

    return num * factorialOfNumber(num - 1);
}

// Question 2 : 
int nthFibonnaci(int n){

    //considering 0th position also
    if(n <= 0) return 0;
    if(n == 1) return 1;
    if(n == 2) return 1;

    return nthFibonnaci(n - 1) + nthFibonnaci(n - 2);
}


// Question 3 : 
int generateFibonacci(int n, vector<int> &ans){
    if(n <= 0) return 0;
    if(n == 1) return 1;
    if(n == 2) return 1;

    if(ans[n] != 0)
        return ans[n];

    int currResult = generateFibonacci(n - 1, ans) + generateFibonacci(n - 2, ans);

    ans[n] = currResult;
}

void printFibonacci(int n){

    vector<int> ans(n+1, 0);
    ans[0] = 0;
    ans[1] = 1;
    ans[2] = 1;
    generateFibonacci(n, ans);

    for (int i = 0; i <= n; i++){
        cout << ans[i] << " ";
    }
}


// Question 4 : 
bool checkPalindrome(string str, int start, int end){
    if(start >= end)
        return true;
    
    if(str[start] != str[end])
        return false;

    return checkPalindrome(str, start + 1, end - 1);
}

bool palindromeString(string str){
    int start = 0;
    int end = str.size() - 1;

    return checkPalindrome(str, start, end);
}

// Question 5 : 
int sumOfElement(int arr[], int size, int index){
    if(index >= size)
        return 0;

    return arr[index] + sumOfElement(arr, size, index + 1);
}


// Question 6 : 
int maxElement(int arr[], int size, int index){
    if(index >= size)
        return INT_MIN;
    
    return max(arr[index], maxElement(arr, size, index + 1));
}

int main(){

    cout << "Factorial of a Number is : " << factorialOfNumber(10) << endl;

    cout << "Nth Fibonnaci Number is : " << nthFibonnaci(10) << endl;

    cout << "Printing Fibonacci Series : ";
    printFibonacci(10);
    cout << endl;


    cout << "Given String is palindrome : " << palindromeString("khilesh") << endl;
    cout << "Given String is palindrome : " << palindromeString("nitin") << endl;


    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int size = 10;
    cout << "Sum of all the elements : " << sumOfElement(arr, size, 0) << endl;

    int arr2[] = {10, 15, 40, 25, 30};
    size = 5;
    cout << "Sum of all the elements : " << sumOfElement(arr2, size, 0) << endl;


    cout << "Max element : " << maxElement(arr2, size, 0) << endl;

    return 0;
}