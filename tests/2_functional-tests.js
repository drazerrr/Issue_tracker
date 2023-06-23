const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
//  Create an issue with every field: POST request to /api/issues/{project}
  
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}
let deleteID;
suite('Functional Tests', function() {
  suite("Routing Tests", function () {
    suite("3 Post request Tests", function () {
        test("Create an issue with every field: POST request  to /api/issues/{project}", function (done) {
            chai
            .request(server)
            .post("/api/issues/projects")
            .set("content-type", "application/json")
            .send({
                issue_title: "Issue",
                issue_text: "Function Test",
                created_by: "Fcc",
                assigned_to: "Anurag",
                status_text: "Not Done"
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                deleteID = res.body._id;
                assert.equal(res.body.issue_title, "Issue");
                assert.equal(res.body.assigned_to, "Anurag");
                assert.equal(res.body.created_by, "Fcc");
                assert.equal(res.body.status_text, "Not Done");
                assert.equal(res.body.issue_text, "Function Test");
                done();
            });
        });

        test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
            chai
            .request(server)
            .post("/api/issues/projects")
            .set("content-type", "application/json")
            .send({
                issue_title: "Issue",
                issue_text: "Functional Test",
                created_by: "Fcc",
                assigned_to: "",
                status_text: ""
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.issue_title, "Issue");
                assert.equal(res.body.issue_text, "Functional Test");
                assert.equal(res.body.created_by, "Fcc");
                assert.equal(res.body.assigned_to, "");
                assert.equal(res.body.status_text, "");
                done();
            });
        });

        test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
            chai
            .request(server)
            .post("/api/issues/projects")
            .set("content-type", "application/json")
            .send({
                issue_title: "",
                issue_text: "",
                created_by: "Fcc",
                assigned_to: "",
                status_text: ""
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "required field(s) missing");
                done();
            });
        });
    });
            // 3 get request test

            suite("3 GET request Tests", function() {
                test("View issue on a project: GET request to /api/issues/{project}", function (done) {
                    chai
                    .request(server)
                    .get("/api/issues/{my project}")
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.length, 1);
                        done();
                    });
                });

                test("View issue on a project with one filter: GET request to /api/issues/{project}", function (done) {
                    chai
                    .request(server)
                    .get("/api/issues/apitest")
                    .query({
                        _id: "649026c834a0a506e4fea22f"
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.deepEqual(res.body[0], {
                            "_id":"649026c834a0a506e4fea22f","issue_title":"pille",
                            "issue_text":"jhg","created_on":"2023-06-19T09:58:32.309Z","created_by":"ghjhggj",
                            "assigned_to":"",
                            "open":true,
                            "status_text":""
                        });
                        done();
                    });
                });

                test("View issue on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
                    chai
                    .request(server)
                    .get("/api/issues/apitest")
                    .query({
                        issue_title: "pille",
                        issue_text: "jhg"
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.deepEqual(res.body[0], {
                            "_id":"649026c834a0a506e4fea22f","issue_title":"pille",
                            "issue_text":"jhg","created_on":"2023-06-19T09:58:32.309Z","created_by":"ghjhggj",
                            "assigned_to":"",
                            "open":true,
                            "status_text":""
                        });
                        done();
                    });
                });
            });

                    /// PUT request Tests ///
           suite("5 PUT request Tests", function () {
            test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .put("/api/issues/apitest")
                .send({

                    _id: "649026c734a0a506e4fea228",
                    issue_title: "Issue"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully updated");
                    assert.equal(res.body._id, "649026c734a0a506e4fea228");
                    done();
                });
            });

            test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .put("/api/issues/apitest")
                .send({
                    _id: "649026c834a0a506e4fea22d",
                    issue_title: "jai raghunath",
                    issue_text: "jai shree ram",
                    created_by: "Anurag",
                    assigned_to: "Harsh",
                    status_text: "complete",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body._id, "649026c834a0a506e4fea22d");
                    assert.equal(res.body.result, "successfully updated");
                    done();
                });
            });

            test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .put("/api/issues/apitest")
                .send({
                    issue_title: "anurag",
                    issue_text: "value"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "missing _id");
                    done();
                });
            });

            test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .put("/api/issues/apitest")
                .send({
                    _id: "649026c834a0a506e4fea22d"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "no update field(s) sent");
                    done();
                });
            });

            test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .put("/api/issues/apitest")
                .send({
                    _id: "45645kj63lk6j",
                    issue_title: "anurag"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not update");
                    done();
                });
            });
           });
           
           suite("3 Delete request Tests", function () {
            test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .delete("/api/issues/projects")
                .send({
                    _id: deleteID
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully deleted");
                    done();
                });
            });

            test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .delete("/api/issues/apitest")
                .send({
                    _id: "45356sdjlkjltrt"
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "could not delete");
                    done();
                });
            });

            test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
                chai
                .request(server)
                .delete("/api/issues/apitest")
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, "missing _id");
                    done();
                })
            })
           })
  })
  
});
