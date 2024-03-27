#include<bits/stdc++.h>
using namespace std;

void solve(string str, int size, set<string> &ans, int index){

    if(index >= size){
        ans.insert(str);
        return;
    }

    for (int i = index; i < size; i++){
        swap(str[index], str[i]);
        solve(str, size, ans, index + 1);
        swap(str[index], str[i]);
    }
}

vector<string> generatePermutation(string str, int size){
    set<string> ans;

    solve(str, size, ans, 0);

    vector<string> result;
    for(auto it : ans){
        result.push_back(it);
    }
    return result;
}


int main(){

    string str = "khilesh";
    int size = str.size();

    vector<string> ans = generatePermutation(str, size);

    for (int i = 0; i < ans.size(); i++){
        cout << i+1 << " : " << ans[i] << endl;
    }

    return 0;
}