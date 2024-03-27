// implement Quadratic proping

// implement chained linked list 
#include<bits/stdc++.h>
using namespace std;


// For creating Nodes
class Node{
    public:
        int key;
        Node *next;

        Node(int val){
            this->key = val;
            this->next = NULL;
        }
};


// Chained LL is array which contains Nodes / linked list
class chainedLL{
    private:
        vector<Node *> arr;
        int size;

    public:

        chainedLL(int size){
            this->arr.resize(size);
            this->size = size;

            for (int i = 0; i<size; i++){
                arr[i] = NULL;
            }
        }

        void insert(int val){
            Node *newNode = new Node(val);

            int currIndex = val % this->size;

            //First element for curr index
            if(arr[currIndex] == NULL){
                arr[currIndex] = newNode;
            }
            //Aage move kareke insert karege
            else{
                Node *curr = this->arr[currIndex];

                while(curr->next){
                    curr = curr->next;
                }

                curr->next = newNode;
            }
        }

        void checkElement(int val){
            
            int currIndex = val % this->size;

            Node *curr = this->arr[currIndex];

            while(curr){
                if (curr->key == val){
                    cout << val << " is Present" << endl;
                    return;
                }

                curr = curr->next;
            }

            cout << val << " is Not Present" << endl;
        }
};

int main(){

    int arr[10] = {22, 12, 10, 2, 4, 56, 3, 6, 7, 8};

    chainedLL* hashMap = new chainedLL(10);

    // Storing all the elements in chained LL / map
    for (int i = 0; i < 10; i++){
        hashMap->insert(arr[i]);
    }

    //checking that element is present or not
    hashMap->checkElement(12);
    hashMap->checkElement(10);
    hashMap->checkElement(1);
    hashMap->checkElement(2);

    return 0;
}

