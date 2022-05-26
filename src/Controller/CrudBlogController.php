<?php

namespace App\Controller;

use App\Entity\Blog;
use App\Entity\Comment;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route("/spa", name:"_spa")]
class CrudBlogController extends AbstractController
{

    #[Route('/blogs', name: 'blogs', methods:["GET"])]
    public function index(EntityManagerInterface $em): Response
    {
        $blogs = $em->getRepository(Blog::class)->findAll();
        $data = [];

        foreach ($blogs as $blog) {
            $data[] = [
                'id' => $blog->getId(),
                'author' => $blog->getAuthor(),
                'title' => $blog->getTitle(),
                'blogpost' => $blog->getBlogpost(),
                'blogDate' => $blog->getBlogDate(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/blogs', name: 'blog_new', methods:["POST"])]   
    public function newBlog(Request $request, ManagerRegistry $doctrine): Response
    {
        $datenow = new \Datetime(date("Y-m-d"));
        $em = $doctrine->getManager();
        $blog = new Blog();
        $blog->setTitle($request->request->get("title"));
        $blog->setAuthor($request->request->get("author"));
        $blog->setBlogpost($request->request->get("blogpost"));
        $blog->setBlogDate($datenow);
        $em->persist($blog);
        $em->flush();

        if ($blog == []) {
            echo "array is empty";
            exit;
        }


        return $this->json("Created new blog with an id of: " . $blog->getId());
    } 


    #[Route('/blogs/{id}', name: 'blog_show', methods:["GET"])]
    public function show(int $id, ManagerRegistry $doctrine): Response
    {
        $blog = $doctrine->getRepository(Blog::class)->find($id);
        $comments = $blog->getComments();

        if (!$blog) {
            return $this->json("No blog found for id: " . $id, 404);
        }

        $allComments = [];

        foreach ($comments as $comment) {
            $oneComment = ["author" => $comment->getAuthor(), "comment" => $comment->getComment(), "commentDate" => $comment->getCommentDate()];
            array_push($allComments, $oneComment);
        }

        $data = [
            'id' => $blog->getId(),
            'title' => $blog->getTitle(),
            'author' => $blog->getAuthor(),
            'blogpost' => $blog->getBlogpost(),
            'blogDate' => $blog->getBlogDate(),
            'comments' => $allComments,
        ];

        return $this->json($data);
    }
}
