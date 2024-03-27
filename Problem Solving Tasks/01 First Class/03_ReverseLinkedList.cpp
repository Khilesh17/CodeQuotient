#include<bits/stdc++.h>
using namespace std;

class Node{
    public:
        int data;
        Node *next;

        Node(int data){
            this->data = data;
            this->next = NULL;
        }
};

void insertAtTail(Node* &head, Node* &tail, int val){

    Node *newNode = new Node(val);
    if(head == NULL){
        head = newNode;
        tail = newNode;
    }
    else{
        tail->next = newNode;
        tail = newNode;
    }
}

void printLL(Node* head){
    while(head){
        cout << head->data << " ";
        head = head->next;
    }
}

void solve(Node* &head, Node* &prev){
    if(head == NULL)
        return;
    
    Node* next = head->next;
    head->next = prev;
    prev = head;
    head = next;
    solve(head, prev);
}

void reverseLinkedList(Node* &head){

    Node *prev = NULL;
    solve(head, prev);

    head = prev;
}

int main(){

    Node *head = NULL;
    Node *tail = NULL;

    insertAtTail(head, tail, 1);
    insertAtTail(head, tail, 2);
    insertAtTail(head, tail, 3);
    insertAtTail(head, tail, 4);
    insertAtTail(head, tail, 5);

    cout << "Before Reversing : ";
    printLL(head);

    reverseLinkedList(head);

    cout << endl << "After Reversing : ";
    printLL(head);

    return 0;
}