#include <iostream>
using namespace std;


int** matrix_multiply(int **arr1, int row1, int col1, int **arr2, int row2, int col2) {
    // Check if matrices can be multiplied
    if (col1 != row2) {
        cout << "Multiplication is not possible." << endl;
        return nullptr;
    }

    // Allocate memory for the ans matrix
    int **ans = new int*[row1];
    for (int i = 0; i < row1; ++i) {
        ans[i] = new int[col2]();
    }

    // Multiplication krege
    for (int i = 0; i < row1; ++i) {
        for (int j = 0; j < col2; ++j) {
            for (int k = 0; k < col1; ++k) {
                ans[i][j] += arr1[i][k] * arr2[k][j];
            }
        }
    }

    return ans;
}

int main() {
    int row1, col1;
    cout << "Enter row1 and col1: ";
    cin >> row1 >> col1;

    // Allocate memory for matrix 1
    int **arr1 = new int*[row1];
    for (int i = 0; i < row1; i++) {
        arr1[i] = new int[col1];
    }

    cout << "Enter elements of matrix 1:" << endl;
    for (int i = 0; i < row1; i++) {
        for (int j = 0; j < col1; j++) {
            cin >> arr1[i][j];
        }
    }

    int row2, col2;
    cout << "Enter row2 and col2: ";
    cin >> row2 >> col2;

    // Allocate memory for matrix 2
    int **arr2 = new int*[row2];
    for (int i = 0; i < row2; i++) {
        arr2[i] = new int[col2];
    }

    cout << "Enter elements of matrix 2:" << endl;
    for (int i = 0; i < row2; i++) {
        for (int j = 0; j < col2; j++) {
            cin >> arr2[i][j];
        }
    }

    // Multiply matrices
    int **result = matrix_multiply(arr1, row1, col1, arr2, row2, col2);

    // Output the result
    if (result != nullptr) {
        cout << "Resultant Matrix:" << endl;
        for (int i = 0; i < row1; i++) {
            for (int j = 0; j < col2; j++) {
                cout << result[i][j] << " ";
            }
            cout << endl;
        }

        // Deallocate memory for the result
        for (int i = 0; i < row1; i++) {
            delete[] result[i];
        }
        delete[] result;
    }


    //Deallocate the memory for both the matrix
    for (int i = 0; i < row1; i++) {
        delete[] arr1[i];
    }
    delete[] arr1;

    for (int i = 0; i < row2; i++) {
        delete[] arr2[i];
    }
    delete[] arr2;

    return 0;
}
